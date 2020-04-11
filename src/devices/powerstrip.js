const isOutlet = (state, device, config) =>
  state.consumption !== undefined ||
  config.outlet_ids.indexOf(device.object_id) !== -1;

module.exports = ({ Characteristic, Service }) => {
  return {
    type: "powerstrip",
    group: "powerstrips",
    services: [
      {
        service: Service.Outlet,
        supported: isOutlet,
        characteristics: [
          {
            characteristic: Characteristic.On,
            get: state => state.powered,
            set: value => ({ powered: !!value })
          },
          {
            characteristic: Characteristic.OutletInUse,
            get: state =>
              state.consumption ? state.consumption > 0.1 : state.powered
          }
        ]
      }
    ]
  };
};
