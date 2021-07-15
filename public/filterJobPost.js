var companyName = document.getElementById("filterCompany")
document.getElementById("filterCompanyBtn").addEventListener("click", filterCompany)



function filterCompany(){
    try{
        var jobPost = document.getElementById(companyName.value);
        var jobCard = jobPost.parentElement.parentElement.parentElement.parentElement
        jobCard.style.display = "none";
    }catch(err){
        alert("Please enter a value company name (Caps sensitive)");
    }
    
}
