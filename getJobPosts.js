const axios = require("axios").default;
const cheerio = require("cheerio");

// const pageURL = "https://uk.linkedin.com/jobs/search?keywords=graduate%20software&location=Harlow%2C%20England%2C%20United%20Kingdom&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0";

async function getJobPosts(title = "Software Engineering", location = "London") {
  
  // URLEncode Strings
  title = title.replace(" ", "%20")
  location = location.replace(" ", "%20")

  // Build Request URL
  const pageURL = `https://uk.linkedin.com/jobs/search?keywords=${title}&location=${location}&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0`
  
  // GET Data
  const { data } = await axios.get(pageURL);
  const $ = cheerio.load(data);

  
  const jobsearch = $(".jobs-search__results-list");
  
  const jobPosts = [];

  $(jobsearch).find("li").each((i, elem) => {
    const $elem = $(elem);
    
    const title = $elem.find("h3").text();
    const companyName = $elem.find("h4").text();
    const location = $elem.find('span[class="job-search-card__location"]').text();
    const datePosted = $elem.find('time').text();
    const imageURL = $elem.find("img").attr("data-delayed-url");
    const jobURL = $elem.find("a").attr("href");
    
    const jobPost = {
      title : title.trim(),
      companyName : companyName.trim(),
      location: location.trim(),
      datePosted: datePosted.trim(),
      imageURL: imageURL.trim(),
      jobURL: jobURL.trim()
    }

    jobPosts.push(jobPost);
  })
  console.log(jobPosts)
  return jobPosts;

}

getJobPosts();

module.exports = getJobPosts



