import ModuleComponent from "./module.vue";

export default {
  id: "PosModule",
  name: "Pos Module",
  icon: "point_of_sale",
  slots: {
    options: () => null,
    //sidebar: () => null,
    actions: () => null,
  },
  routes: [
    {
      path: "",
      component: ModuleComponent,
    },
  ],  
  
};
