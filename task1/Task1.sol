// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;

contract ProjectData {
    // enum stat {notSubmitted, submitted}
    struct Project {
        string studentId;
        string studentName;
        string submissionStatus;
        string gitlabURL;
        string projectName;
        string projectDescription;
        string statusOfEachPhase;
    }
    
    mapping(string => Project) projectDatas;
    
    function storeDetails(string memory id, string memory name, string memory status, string memory url, string memory projName, string memory projDesc, string memory projStat) public{
        projectDatas[id] = Project(id, name, status, url, projName, projDesc, projStat);
    }
    
    function changeDetails(string memory id, string memory url, string memory projName, string memory projDesc) public{
        projectDatas[id].gitlabURL = url;
        projectDatas[id].projectName = projName;
        projectDatas[id].projectDescription = projDesc;
    }
    
    function displayDetails(string memory id) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
        return (projectDatas[id].studentId, projectDatas[id].studentName, projectDatas[id].submissionStatus, projectDatas[id].gitlabURL, projectDatas[id].projectName, projectDatas[id].projectDescription, projectDatas[id].statusOfEachPhase);
    }
}
