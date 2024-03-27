class App {

  routes = [
    { path: '#9', view: null }
  ];

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    const view = this.routes
      .find(route => route.path === location.hash);
    console.log(location.hash);
    console.log(view);
  }

}

new App();

// new MainView().render();



// const testapp = new App();
// console.log(testapp.routes[0])
