require 'net/https'
require 'uri'
require 'json'
require 'rmagick'

# set variables
uri  = "https://www.googleapis.com"
path = "/customsearch/v1"
api_key = 'AIzaSyCdYw5EQ6NsXAzff1HxOD08rfBKckKUElU'
cx = "013154599818599383961:hamsrluhjr0"
term = ARGV[0]

# make the search query
uri = URI(uri + path + "?key=" + api_key + "&q=" + URI.escape(term) + "&cx=" + cx + "&searchType=image&num=5")
request = Net::HTTP::Get.new(uri)
response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
    http.request(request)
end

# get the results
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
puts colors
