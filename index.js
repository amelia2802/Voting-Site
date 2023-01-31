import {candidateArray} from "./data.js"

document.addEventListener("click",function(e){
    if(e.target.id === "login"){
            registerVoter()     
    }

    else if(e.target.dataset.vote){
        
        document.getElementById("candidates").innerHTML = givenVote(e.target.dataset.vote)
    }

    else if((document.getElementById("registration").style.display==="none") && e.target.id==="topreg"){
        alert("You have already voted!")
    } 
})

function voterRegister(){
    let loginForm = 
    `
        <h2 class="registration-text">REGISTER YOURSELF</h2>
        <form id="login_form">
            <label for="username">Your Full Name:</label>
            <input type="text" id="input" class="username" name="username" placeholder="Enter your full name" required><br/>
            <label for="voter_id">6 Digits Voter ID:</label>
            <input type="number" id="input" class="voter_id" name="voter_id" placeholder="Enter voter id" size="6" required><br/>
            <label for="phone">Registered Phone Number:</label>
            <input type="number" id="input" class="phone" name="phone" placeholder="Enter phone number" size="10" required> <br/>
            <button type="button" value="Submit" id="login" class="login"> Register </button>
        </form>
    `
    return loginForm
}

function registerVoter(){
        document.getElementById("registration").style.display="none"
        document.getElementById("candidates").style.display="flex"
        document.getElementById("candidates-brand").style.display="block"
}


function getCandidates(){
    let votedCandidates = ""
    let totalVotes = 0

    candidateArray.forEach(function(candidate) {
        votedCandidates+=
        `
            <div class="cadidate-card">
                <img class="profile-pic" src="${candidate.img}"
                <h3 class="candidate-name">${candidate.name}</h3>
                <div id="candidate-data">
                    <p class="symbol">Icon: ${candidate.symbol}</p>
                </div>
                <button type="submit" id="vote" data-vote=${candidate.id}>VOTE</button>
            </div>
        `
        totalVotes+= candidate.votes
        
    });
    return votedCandidates
}

function render(){
    document.getElementById("registration").innerHTML = voterRegister()
    document.getElementById("candidates").innerHTML = getCandidates()   
}


function givenVote(candidateId){
    const idNo = candidateArray.filter(function (candidate){
        return candidate.id === parseInt(candidateId)
    })[0]

    if(idNo.isVoted === false){
        idNo.isVoted = true
        idNo.votes += 1
    }
    let totalVotes=0

    candidateArray.forEach(function(candidate) {
        totalVotes+=candidate.votes
    })

    let percentVote=""
    candidateArray.forEach(function(candidate) {   
    percentVote+=`
        <div class="cadidate-card">
            <img class="profile-pic" src="${candidate.img}"
            <h3 class="candidate-name">${candidate.name}</h3>
            <div id="candidate-data">
                <p class="symbol">Icon: ${candidate.symbol}</p>
            </div>
            <div class="bar">
                <div class="inside" style="height:1em;width:${Math.floor((candidate.votes/totalVotes)*100)}%;background-image:linear-gradient(45deg, #e9f4f5 25%, #00a894 25%, #00a894 50%, #e9f4f5 50%, #e9f4f5 75%, #00a894 75%, #00a894 100%);"><p>${Math.floor((candidate.votes/totalVotes)*100)}%</p> </div>
            </div>
        </div>
        
    `
    })
    
    return percentVote
}

render()



