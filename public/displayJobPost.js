const jobBoard = document.getElementById("jobSection")

async function getJobPosts() {
    const response = await fetch("/jobs");
    const jobPosts = await response.json();

    jobPosts.forEach((job) => {
        const content = `
        <div class="card m-4">
                <div class="card-body">
                    <div class="row" > 
                        <div class="col col-md-2">
                            <img src="${job.imageURL}">
                        </div>
                        <div class="col col-md-10" >
                            <h5 class="card-title">${job.title}</h5>
                            <h6 class="card-text m-2" id="${job.companyName}">${job.companyName}</h6>
                            <h6 class="card-subtitle m-2 text-muted">${job.location}</h6>
                            <p class="card-text m-2">${job.datePosted}</p>
                            <a href="${job.jobURL}" class="stretched-link"></a>
                            <p class="card-text m-2"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        jobBoard.innerHTML += content;
    })
}

getJobPosts()

