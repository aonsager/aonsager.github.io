# == Dependencies ==============================================================

require 'net/https'
require 'uri'
require 'json'
require 'yaml'
require 'rmagick'

# == Configuration =============================================================

# Load the configuration file
CONFIG = YAML.load_file("_config.yml")

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

  # make the search query
  uri = URI(uri + path + "?key=" + CONFIG['google_api_key'] + "&q=" + URI.escape(title) + "&cx=" + CONFIG['search_cx'] + "&searchType=image&num=5")
  puts uri
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
    color = q.to_color(palette[0][0]) # default to most common value, will try to replace
    palette.each do |p|
      pixel = p[0]
      hsl = pixel.to_HSL
      if hsl[2] < 0.3
        # skip because too dark
        next
      elsif hsl[2] > 0.8
        # skip because too light
        next
      else
        color = q.to_color(pixel)
        break
      end
    end
    colors << color
  end
  colors
end


# == Tasks =====================================================================

desc "Create a draft"
task :draft, :title do |t, args|
  # Expect a title passed (rake draft[title])
  if !args.title
    puts "Please provide a title"
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
    'colors' => nil,
    'tags' => nil,
  }

  # Write the file out to the _drafts directory
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
  content = contents[2].strip
  # find colors using the title, and add them to the headers
  headers['colors'] = colors_from_title(headers['title'])
  headers['slug'] ||= transform_to_slug(headers['title'])

  # write out the modified YAML and post contents back to the original file
  File.open(file,'w+') {|file| file.puts YAML::dump(headers) + "---\n\n" + content + "\n"}
  # move the file to the posts folder with a standardized filename
  target = "#{__dir__}/_posts/#{short_date}-#{headers['slug']}.md"
  mv file, target
  puts %Q{Published "#{headers['title']}" to #{target}}
end

desc "Retroactively add colors to posts"
task :colorize do
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

task :test do
  file = '/Users/hekk165/blog/_posts/tumblr/2014-11-17-真如堂.md'
  contents = File.read(file).split(/^---\s*$/)
  headers = YAML::load("---\n"+contents[1])
  content = contents[2].strip
  puts headers['title']
  puts colors_from_title(headers['title'])
end
