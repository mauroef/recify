import Band from '../api/band';

const getBand = () => Band.getAll();

const editBand = (id, name) => Band.update(id, name);

const deleteBand = id => Band.delete(id);

const saveBand = () => {
  const btnSave = document.getElementById('save-band');
  btnSave.onclick = event => {
    event.preventDefault();
    const name = document.getElementById('new-name').value;
    Band.create(name);
  };
};

export { getBand, editBand, deleteBand, saveBand };
