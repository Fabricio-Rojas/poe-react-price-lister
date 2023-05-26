import { Helmet } from 'react-helmet';
import {useForm} from 'react-hook-form';
import React from 'react';

function New() {
  const {register, handleSubmit, formState} = useForm();

  const {errors} = formState;

  const onSubmit = data => console.log(data);

  return (
    <>
    <Helmet>
      <title>Adding new Item</title>
    </Helmet>
    <div className='new-item-form'>
    <form onSubmit={handleSubmit(onSubmit)}>
    <h2>New Item</h2>
      <input
        type='text'
        placeholder='Item Name'
        className={errors.ItemName ? "invalid" : ""}
        {...register("ItemName", {required: true})}
      />
      <input
        type='number'
        placeholder='Item Price'
        className={errors.Price ? "invalid" : ""}
        {...register("Price", {required: true})}
      />
      <input
        type='number'
        placeholder='Stock'
        className={errors.Stock ? "invalid" : ""}
        {...register("Stock", {required: true})}
      />
      <input
        type='text'
        placeholder='Date of Availability (DD/MM/YYYY)'
        className={errors.DateOfAvailability ? "invalid" : ""}
        {...register("DateOfAvailability", {required: true, pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/})}
      />
      <textarea
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        rows="5"
        placeholder='Description of Item (at least 3 words)'
        className={errors.DescriptionOfItem ? "invalid" : ""}
        {...register("DescriptionOfItem", {required: true, minLength: 10})}
      />
      <select 
        className={errors.TypeOfSale ? "invalid" : ""}
        {...register("TypeOfSale", {required: true})} 
        >
        <option value="">Type of Sale</option>
        <option value="Retail">Regular</option>
        <option value="Wholesale">Bulk</option>
      </select>
      <input
        type='text'
        placeholder='Item Image (URL)'
        className={errors.ItemImage ? "invalid" : ""}
        {...register("ItemImage", {required: true})}
      />
      <input
        type='text'
        placeholder='User Contact Email'
        className={errors.ContactEmail ? "invalid" : ""}
        {...register("ContactEmail", {required: true, pattern: /^.*@.*\.([a-z]{2}|[a-z]{3})$/})}
      />
      <input
        className={Object.keys(errors).length === 0 ? "" : "disabled"}
        disabled={!(Object.keys(errors).length === 0)}
        type='submit'
        value='Submit'
        onClick={() => console.log(errors)}
      />
    </form>
    </div>
    </>
  )
}

export default New
