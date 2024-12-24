# == Dependencies ==============================================================

require 'net/https'
require 'uri'
require 'cgi'
require 'nokogiri'
require 'json'
require 'yaml'
require 'rmagick'
require 'date'
require 'openai'

# == Configuration =============================================================

# Load the configuration file
CONFIG = YAML.load_file("_local_config.yml")

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")
TIME = Time.now.strftime("%H:%M:%S")
POST_TIME = DATE + ' ' + TIME

# == Helpers ===================================================================

# Transform the title to a slug
def transform_to_slug(title)
  characters = /("|'|!|\?|:|\s\z)/
  whitespace = /\s/
  "#{title.gsub(characters,"").gsub(whitespace,"-").downcase}"
end

# Creates a user selection menu from directory listing
def choose_file(dir)
  @files = Dir["#{dir}/*"]
  # If there is only one file, pick it
  if @files.count == 1
    file = @files[0]
  else
    # Show a list of files and let the user choose one
    puts "Choose file:"
    @files.each_with_index { |f,i| puts "#{i+1}: #{f}" }
    print "> "
    num = STDIN.gets
    return false if num =~ /^[a-z ]*$/i
    file = @files[num.to_i - 1]
  end
end

# Does an image search for the post title and returns 5 prominent colors
def colors_from_title(title)
  uri  = "https://www.googleapis.com"
  path = "/customsearch/v1"
  title = title[0...30]
  # make the search query
  uri = URI(uri + path + "?key=" + CONFIG['google_api_key'] + "&q=" + CGI.escape(title) + "&cx=" + CONFIG['search_cx'] + "&searchType=image&num=5")
  request = Net::HTTP::Get.new(uri)
  response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      http.request(request)
  end

  # get the image results
  image_urls = []
  parsed_json = JSON.parse(response.body)
  parsed_json['items'].each do |item|
    image_urls << item['image']['thumbnailLink']
  end

  # process each image and get its most dominant color
  colors = []
  image_urls.each do |image_url|
    original = Magick::Image.read(image_url).first
    q = original.quantize(16, Magick::RGBColorspace)
    palette = q.color_histogram.sort {|a, b| b[1] <=> a[1]}
    winning_score = 0
    color = palette[0][0].to_color(Magick::AllCompliance,false,8) # default to most common value, will try to replace
    palette.each do |p|
      pixel = p[0]
      hsl = pixel.to_hsla
      if hsl[2] < 50
        # skip because too dark
        next
      elsif hsl[2] > 200
        # skip because too light
        next
      else
        # prefer vivid colors that are used a lot
        score = hsl[1] * p[1]
        if score > winning_score
          winning_score = score
          color = pixel.to_color(Magick::AllCompliance,false,8)
          break
        end
      end
    end
    colors << color
  end
  colors
end

# Generate 5 tags based on a post's contents using OpenAI
def tags_from_content(input_string)
  blog_text = Nokogiri::HTML(input_string).text

  begin
    client = OpenAI::Client.new(access_token: CONFIG['openai_api_key'])
    response = client.chat(
      parameters: {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an assistant that generates relevant tags for blog posts. Always return tags as a single comma-delineated string with no whitespace." },
          { role: "user", content: "Extract 5 relevant single-word tags for the following blog post:\n\n#{blog_text}\n\nTags:" }
        ],
        max_tokens: 50
      }
    )
    # Extract the response content
    tags = response.dig("choices", 0, "message", "content").strip.downcase
    tags_array = tags.split(',').map(&:strip)
    return tags_array
  rescue StandardError => e
    puts "Error: #{e.message}"
  end
end


# == Tasks =====================================================================

desc "Create a draft"
task :draft, :title do |t, args|
  # Expect a title passed (rake draft[title])
  if !args.title
    puts "Please provide a title (rake draft[title])"
    Process.exit
  else
    title = args.title
  end

  # Fill in the default header data
  headers = {
    'layout' => 'post',
    'title' => title,
    'slug' => transform_to_slug(title),
    'link' => nil,
    'image' => nil,
    'colors' => nil,
    'tags' => nil,
    'archive' => nil,
  }

  # Write the file out to the _drafts directory
  Dir.mkdir "#{__dir__}/_drafts" unless File.directory?("#{__dir__}/_drafts")
  file = "#{__dir__}/_drafts/#{headers['slug']}.md"
  File.open(file,'w+') {|file| file.puts YAML::dump(headers) + "---\n"}
  puts %Q{Created draft in #{file}}
end

desc "Publish a draft"
task :publish, :filename do |t, args|
  # If there's a filename passed (rake publish[filename]) use it.
  # Otherwise, list all available drafts in a menu
  unless args.filename
    file = choose_file(File.join(__dir__,'_drafts'))
    Process.exit unless file # no file selected
  else
    file = args.filename if File.exists?(File.expand_path(args.filename))
    raise "Specified file not found" unless file
  end
  short_date = Time.now.strftime("%Y-%m-%d")

  # separate the YAML headers
  contents = File.read(file).split(/^---\s*$/)
  if contents.count < 3 # Expects the draft to be properly formatted
    puts "Invalid header format on post #{File.basename(file)}"
    Process.exit
  end
  # parse the YAML
  headers = YAML::load("---\n"+contents[1])
  headers['slug'] ||= transform_to_slug(headers['title'])
  content = contents[2].strip
  # find colors using the title, and add them to the headers
  headers['colors'] = colors_from_title(headers['title'])
  # generate tags using the content, and att them to the headers
  headers['tags'] = tags_from_content(content)
  


  # write out the modified YAML and post contents back to the original file
  File.open(file,'w+') {|file| file.puts YAML::dump(headers) + "---\n\n" + content + "\n"}
  # move the file to the posts folder with a standardized filename
  target = "#{__dir__}/_posts/#{short_date}-#{headers['slug']}.md"
  mv file, target
  puts %Q{Published "#{headers['title']}" to #{target}}
end

# rake pinboard[202206]
desc "Collect Pinboard links into a monthly post"
task :pinboard, :yyyymm do |t, args|
  # Get posts from Pinboard
  uri  = "https://api.pinboard.in"
  path = "/v1/posts/all"
  # make the search query
  year = args.yyyymm.to_s[0,4].to_i
  month = args.yyyymm.to_s[4,2].to_i
  start_date = Date.parse("#{year}-#{month}-01")
  uri = URI(uri + path + "?fromdt=" + start_date.strftime("%Y-%m-%dT00:00:00Z") + "&todt=" + (start_date >> 1).strftime("%Y-%m-%dT00:00:00Z") + "&auth_token=" + CONFIG['pinboard_api_key'])
  request = Net::HTTP::Get.new(uri)
  response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      http.request(request)
  end

  reader = Nokogiri::XML::Reader(response.body)
  puts "<dl>"
  reader.each do |node|
    next if node.attribute('href').nil?
    puts "  <dt>"
    puts "    <a href=\"#{node.attribute('href')}\">#{node.attribute('description')}</a>"
    puts "    <span class=\"post-meta\">(  )</span>"
    puts "  </dt>"
    puts "  <dd>#{node.attribute('extended')}</dd>"
  end
  puts "</dl>"
end

desc "Retroactively add colors to posts"
task :colorize_all do
  accepted_formats = ['.txt', '.md', '.markdown']
  # Get the list of posts
  dir = File.join(__dir__,'_posts')
  @files = Dir["#{dir}/**/*"]
  @files.each do |file|
    next unless accepted_formats.include? File.extname(file)

    # separate the YAML headers
    contents = File.read(file).split(/^---\s*$/)
    if contents.count < 3 # Expects the draft to be properly formatted
      puts "Invalid header format on post #{File.basename(file)}"
      Process.exit
    end
    # parse the YAML
    headers = YAML::load("---\n"+contents[1])
    content = contents[2].strip

    # find colors using the title, and add them to the headers
    headers['colors'] = colors_from_title(headers['title'])
    # write out the modified YAML and post contents back to the original file
    File.open(file,'w+') {|file| file.puts YAML::dump(headers) + "---\n\n" + content + "\n"}
    puts "Added colors to #{headers['title']}"
  end
end

desc "See colors for a given string"
task :colorize, :title do |t, args|
  # Expect a title passed (rake colorize[title])
  if !args.title
    puts "Please provide a title"
    Process.exit
  else
    title = args.title
  end

  puts colors_from_title(title)
end

desc "Resize images to a max width of 800px"
task :resize, :dir do |t, args|
  MAX_WIDTH = 800
  # Expect a directory passed (rake resize[dir])
  if !args.dir
    puts "Please provide a directory (rake resize[dir]"
    Process.exit
  else
    dir = args.dir
  end
  @files = Dir["#{dir}/*"]
  @files.each do |filepath|
    puts filepath
    begin
      img = Magick::Image.read(filepath).first
    rescue
      puts "Skipping #{filepath}"
      next
    end

    scaling_factor = 1.0 * MAX_WIDTH / img.columns
    if scaling_factor < 1
      new_image = img.resize(scaling_factor)
      new_image.write filepath
    end
  end
end

desc "Create thumbnails for a folder of images"
task :thumbnails, :dir do |t, args|
  MAX_WIDTH = 200
  # Expect a directory passed (rake thumbnails[dir])
  if !args.dir
    puts "Please provide a directory (rake thumbnails[dir]"
    Process.exit
  else
    dir = args.dir
  end
  Dir.mkdir "#{dir}/thumbs" unless File.directory?("#{dir}/thumbs")
  @files = Dir["#{dir}/*"]
  @files.each do |filepath|
    puts filepath
    # create thumbnails
    begin
      img = Magick::Image.read(filepath).first
    rescue
      puts "Skipping #{filepath}"
      next
    end

    thumb_path = "#{dir}/thumbs/#{filepath.split('/').last}"

    scaling_factor = 1.0 * MAX_WIDTH / img.columns
    size = [img.columns * scaling_factor, img.rows * scaling_factor]

    thumbnail = img.thumbnail(*size)
    thumbnail.write thumb_path
  end

end
