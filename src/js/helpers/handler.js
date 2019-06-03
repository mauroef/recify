import Recital from '../api/recital';
import Band from '../api/band';
import Place from '../api/place';

// recitals
const getRecital = () => Recital.getAll();
const deleteRecital = id => Recital.delete(id);

// bands
const getBand = () => Band.getAll();

const editBand = (id, name) => Band.update(id, name);

const deleteBand = id => Band.delete(id);

const saveBand = () => {
  const btnSave = document.getElementById('save-band');
  btnSave.onclick = event => {
    event.preventDefault();
    const name = document.getElementById('new-band').value;
    Band.create(name);
  };
};

// places
const getPlace = () => Place.getAll();

const editPlace = (id, name) => Place.update(id, name);

const deletePlace = id => Place.delete(id);

const savePlace = () => {
  const btnSave = document.getElementById('save-place');
  btnSave.onclick = event => {
    event.preventDefault();
    const name = document.getElementById('new-place').value;
    Place.create(name);
  };
};

export {
  getRecital,
  deleteRecital,
  getBand,
  editBand,
  deleteBand,
  saveBand,
  getPlace,
  editPlace,
  deletePlace,
  savePlace
};
