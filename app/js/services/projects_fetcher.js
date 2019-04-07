module.exports = function (configManager, $http) {
  var ProjectsFetcher = {};
  ProjectsFetcher.labels = {};

  var request = function (url) {
    return $http({
      url: configManager.getUrl() + '/api/v4' + url,
      headers:  {'PRIVATE-TOKEN': configManager.getPrivateToken()}
    });
  };

  ProjectsFetcher.getProjects = function() {
    var url = '/projects?page=1&per_page=100';
    return request(url).then(function(response) {
      var projects = formatProjectList(response.data);

      return projects.sort(function(project1, project2) {

        return project1.name_with_namespace.localeCompare(project2.name_with_namespace)
      })
    });
  };

  function formatProjectList(projects){
    var blackListedProjectsIds = configManager.getBlackListedProjectsIds();

    return projects.map(function(project){
      if(blackListedProjectsIds.indexOf(project.id) !== -1){
        project.black_listed = true;
        return project;
      }
      project.black_listed = false;
      return project;
    });
  }

  return ProjectsFetcher;
};
