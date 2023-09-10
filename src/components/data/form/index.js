import { genderList } from "../lists/gender";

export const addFormDef = [
    {
      fieldType: 'text',
      fieldId: 'name',
      value: '',
      disabled: false,
      label: 'Nama',
    },
    {
      fieldType: 'text',
      fieldId: 'address',
      value: '',
      disabled: false,
      label: 'Alamat',
    },
    {
      fieldType: 'selection',
      fieldId: 'gender',
      value: '',
      disabled: false,
      label: 'P/W',
      options: genderList
    },
    {
      fieldType: 'date',
      fieldId: 'dob',
      value: '',
      disabled: false,
      label: 'Tanggal Lahir',
    },
  ];