document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id == id); // debugged
  currentIssue.status = "Closed";
  currentIssue.description = `<strike>${currentIssue.description}</strike>`;
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.find((issue) => issue.id == id); // debugged
  // console.log(issues);
  if (remainingIssues !== undefined) {
    const issue = issues.indexOf(remainingIssues);
    // console.log(issue);
    issues.splice(issues, 1);
    localStorage.setItem("issues", JSON.stringify(issues));
    document.getElementById("issuesList").addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.parentNode.style.display = "none";
    });
    totalIssue("total-issue", issues);
  }
};

const fetchIssues = () => {
  const issue = localStorage.getItem("issues");

  if (issue) {
    const issues = JSON.parse(localStorage.getItem("issues"));
    const issuesOpen = issues.filter((issue) => issue.status == "Open");
    totalIssue("total-issue", issuesOpen);
    const issuesList = document.getElementById("issuesList");
    issuesList.innerHTML = "";
    // console.log(issues);
    for (var i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];

      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger" id="btn">Delete</a>
                              </div>`;
    }
  } else {
    return;
  }
};

// total issue count
const totalIssue = (id, issue) => {
  document.getElementById(id).innerHTML = `
    <h2>Current Issues: ${issue.length}</h2>
  `;
};
