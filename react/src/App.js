import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState({ name: '', date_of_joining: '', image: null });
  const [base64String, setBase64String] = useState('');

  const apiURL = 'http://localhost:5000/view';

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(apiURL);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

function  deleteID(id){
    console.log(id);
    axios
      .delete(`http://localhost:5000/remove?id=${id}`)
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);

        const postData = {
          ...value,
          image: reader.result,
        };
        console.log(postData.image);
        axios
          .post(`http://localhost:5000/add`, postData)
          .then((result) => {
            console.log(result);
            getData();
          })
          .catch((err) => console.log(err));
      };
      reader.readAsDataURL(value.image);
    } else {
      console.log(value, base64String);
    }
  };

  return (
    <>
      <div className='m-4'>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          ADD
        </button>
        <div className='m-4'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S no</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Date of Joining</th>
                <th scope="col">Image</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} style={{ verticalAlign: 'middle', textAlign: 'left' }}>
                  <td>{index + 1}</td>
                  <td>tnpLab{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.date_of_joining}</td>
                  {/* <td><input value={base64String} /></td> */}
                  <td>
                    {item.image ? (
                      <img src={`${item.image}`} alt="Employee" style={{ width: '100px', height: '100px' }} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td><button onClick={()=>{deleteID(item.id)}}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setValue({ ...value, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label>DOJ</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setValue({ ...value, date_of_joining: e.target.value })}
                      placeholder="Enter DOJ"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
                      placeholder="Upload image"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
