import './Dashboard.css';
import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import { useState, useCallback, useEffect} from 'react';
import { Field } from '../../components/field';
import { genderList } from '../../components/data/lists/gender';
import { BackIcon } from '../../components/icons/back';
import { DefaultButton } from '../../components/button/DefaultButton';
import { ClientAddIcon } from '../../components/icons/client-add';
import { ClientShowIcon } from '../../components/icons/client-show';
import { ClientUpdateIcon } from '../../components/icons/client-update';
import { ClientDeleteIcon } from '../../components/icons/client-delete';
import { dateFormat } from '../../components/function';
import { urlApi } from '../../components/data/config';
import { addFormDef } from '../../components/data/form';

function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [formField, setFormField] = useState(addFormDef);
  // layout
  const [openForm, setOpenForm] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  // edit params
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState();

  const onChange = useCallback((fieldId, value) => {
    const cloneFormField = cloneDeep(formField);
    cloneFormField.find(e=> e.fieldId === fieldId).value = value;
    setFormField(cloneFormField)
  },[formField])

  const getAll = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(`${urlApi}users`);
    setAllUsers(res?.data?.data || []);
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const name = formField.find(e => e.fieldId === 'name').value;
    const address = formField.find(e => e.fieldId === 'address').value;
    const gender = formField.find(e => e.fieldId === 'gender').value;
    const date_of_birth = formField.find(e => e.fieldId === 'dob').value;
    await axios.post(`${urlApi}${isEdit ? 'update' : 'register'}`, {
          id: editId,
          name,
          address,
          gender: gender !== "" ? genderList.find(e => e.id === gender).value : null,
          date_of_birth: date_of_birth !== "" ? date_of_birth : null,
        });

    getAll();
    setOpenForm(false);
    setFormField(addFormDef);
    setLoading(false);
    setEditId();
  }, [formField, getAll, isEdit, editId]);

  const handleEdit = useCallback(async (data)=> {
    setEditId(data.id);
    const cloneFormField = cloneDeep(formField);
    cloneFormField.find((e)=> e.fieldId === "name").value = data.name;
    cloneFormField.find((e)=> e.fieldId === "address").value = data?.address || "";
    cloneFormField.find((e)=> e.fieldId === "gender").value = !isEmpty(data.gender) && genderList.find(e=>e.value === data.gender).id;
    cloneFormField.find((e)=> e.fieldId === "dob").value = data?.date_of_birth || "";
    console.log("cloneFormField", cloneFormField)
    setFormField(cloneFormField)
    setOpenForm(true);
    setIsEdit(false);
    setIsEdit(true);
  },[formField])

  const handleView = useCallback(async (data)=> {
    const cloneFormField = cloneDeep(formField);
    cloneFormField.find((e)=> e.fieldId === "name").value = data.name;
    cloneFormField.find((e)=> e.fieldId === "address").value = data?.address || "";
    cloneFormField.find((e)=> e.fieldId === "gender").value = !isEmpty(data.gender) && genderList.find(e=>e.value === data.gender).id;
    cloneFormField.find((e)=> e.fieldId === "dob").value = data?.date_of_birth || "";
    
    cloneFormField.find((e)=> e.fieldId === "name").disabled = true;
    cloneFormField.find((e)=> e.fieldId === "address").disabled = true;
    cloneFormField.find((e)=> e.fieldId === "gender").disabled = true;
    cloneFormField.find((e)=> e.fieldId === "dob").disabled = true;
    setFormField(cloneFormField)
    setOpenForm(true);
    setViewOnly(true);
  },[formField])

  const handleDelete = useCallback(async (id)=> {
    if(window.confirm("Anda yakin akah hapus data ini?")){
      await axios.post(`${urlApi}removeuser`, {
        id
      })
      getAll();
    }
  },[getAll])

  const handleBack = useCallback(()=>{
    setOpenForm(false);
    setFormField(addFormDef);
    setViewOnly(false);
    setIsEdit(false);
    setEditId();
  },[])

  useEffect(()=>{
    if(!formField.find((e) => e.fieldId === "name").value){
      setError(true);
    }else{
      setError(false);
    }
  },[formField])

  useEffect(()=>{
    getAll();
  },[])

  const form = () => {
    return (
      <div>
        <div className='iconTextButton' onClick={handleBack}><BackIcon />Back</div>
        {formField.map((data, idx) => {
          return(
            <Field
              key={idx}
              fieldType={data.fieldType}
              fieldId={data.fieldId}
              disabled={data.disabled}
              label={data.label}
              value={data.value}
              onChange={onChange}
              options={data.options}
            />
          )
        })}
        {!viewOnly && (<DefaultButton disabled={error} onClick={handleSubmit} label={"Submit"} />)}
      </div>
    )
  }
  const showData = () => {
    const headerLabel = [
      "No",
      "Name",
      "Alamat",
      "P/W",
      "Tanggal Lahir",
      "Tanggal Input",
      "Aksi"
    ]
    return (
      <>
        <div className='iconTextButton' onClick={()=>setOpenForm(true)}><ClientAddIcon />Add User</div>
        <table>
          <thead>
            <tr>
              {headerLabel.map((e, i)=><th key={i}>{e}</th>)}
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? allUsers.map((data, idx) => {
              return(
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{data.name}</td>
                  <td>{data?.address || "-"}</td>
                  <td>{data?.gender || "-"}</td>
                  <td>{data.date_of_birth ? dateFormat(data.date_of_birth) : "-"}</td>
                  <td>{dateFormat(data.createdAt, true)}</td>
                  <td>
                    <div className='actionContainer'>
                      <div className='iconButton' onClick={()=> handleView(data)}><ClientShowIcon /></div>
                      <div className='iconButton' onClick={()=> handleEdit(data)}><ClientUpdateIcon /></div>
                      <div className='iconButton' onClick={()=> handleDelete(data.id)}><ClientDeleteIcon /></div>
                    </div>
                  </td>
                </tr>
              );
            }) : 
            <tr>
              <td colSpan={7} style={{textAlign: 'center'}}>
                No Data
              </td>
            </tr>}
          </tbody>
        </table>
      </>
    )
  }
  return (
    <div className="App">
      {loading && "Loading"}
      {openForm ? form() : showData()}
    </div>
  )
}

export default Dashboard;
