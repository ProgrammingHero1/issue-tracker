document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  if(description && assignedTo){
    const issue = { id, description, severity, assignedTo, status };
  
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  
    document.getElementById('issueInputForm').reset();  
    fetchIssues();
    e.preventDefault();
  }
  else{
    alert("Input required")
  }

  
  

}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => parseInt(issue.id) === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  

}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( x => parseInt(x.id) !== id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  let rIssue = issues.length;
  let tIssue = issues.length;
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    if(status==="Closed"){
      rIssue = rIssue - 1;
    }
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info ${status === "Closed" ? "bg-danger" : "" }" > ${status} </span></p>
                              <h3> ${status === "Closed" ? "<strike>" : "" } ${description} ${status === "Closed" ? "</strike>" : "" } </h3>
                              <p><span class="glyphicon glyphicon-time"></span>  ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  
  document.getElementById("remaining-issue").innerText = rIssue;
  document.getElementById("total-issue").innerText = tIssue;
 
}
