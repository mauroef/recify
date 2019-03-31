import axios from 'axios';

class Artists {
  // static async getAll() {
  //   return notAuthorizedResolver(() =>
  //     axios.get(`${AREA_API}/areas`, authHeader(Constants.inIFrame))
  //   );
  // }
  // static async getById(id) {
  //   return notAuthorizedResolver(() =>
  //     axios.get(`${AREA_API}/areas/${id}`, authHeader(Constants.inIFrame))
  //   );
  // }
  // static async remove(areaId) {
  //   return notAuthorizedResolver(() =>
  //     axios.delete(
  //       `${AREA_API}/areas/${areaId}`,
  //       authHeader(Constants.inIFrame)
  //     )
  //   );
  // }
  // static async saveArea({ _id, ...area }) {
  //   const apiCall =
  //     _id !== 'newArea'
  //       ? { action: 'patch', id: `/${_id}` }
  //       : { action: 'post', id: '' };
  //   return notAuthorizedResolver(() =>
  //     axios[apiCall.action](
  //       `${AREA_API}/areas${apiCall.id}`,
  //       area,
  //       authHeader(Constants.inIFrame)
  //     )
  //   );
  // }
}
