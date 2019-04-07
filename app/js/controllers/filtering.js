module.exports = function (configManager, ProjectsFetcher) {
  var vm = this;
  vm.projects = [];

  vm.toggleBlackList = function(project){
    var blackListedProjectsIds = configManager.getBlackListedProjectsIds();
    var indexOfProject = blackListedProjectsIds.indexOf(project.id);

    if(indexOfProject !== -1){
      blackListedProjectsIds.splice(indexOfProject, 1)
    }else {
      blackListedProjectsIds.push(project.id)
    }

    configManager.setBlackListedProjectsIds(blackListedProjectsIds);
    project.black_listed = !project.black_listed;
  }

  ProjectsFetcher.getProjects().then(function(projects){
    vm.projects = projects;
  })
};


