import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { showError, showSuccess, showLoading } from '../../utils/message';
import { getCategories, createProduct } from '../../api/apiAdmin';
import { userInfo } from '../../utils/auth';

const CreateProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: '',
    });

    const {
        name,
        description,
        price,
        category,
        categories,
        quantity,
        loading,
        error,
        success,
        formData,
        disabled
    } = values;

    useEffect(() => {
        getCategories()
            .then(response => {
                setValues({
                    ...values,
                    categories: response.data,
                    formData: new FormData()
                })
            })
            .catch(error => {
                setValues({
                    ...values,
                    error: "Failed to load categories!",
                    formData: new FormData()
                })
            })

    }, [])

    const handleChange = (e) => {
        //photo ta different vabe collect korbo karon ekhane ekta file ase.
        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;//jodi photo thake tahole files namer ekta array te ba file field thakle files namer ekta array te tahke.jehetu amra ekta chobi pathassi so, array te ektai member thakbe se karone amra 1st member k 0 indexing kore nibo.
        //evabe ullekh na korle just image ta save hoto na sudhu puro array tai save hoye jeto.e karone evabe koresi jate 1st member ta collect korte pari

        //amra je formData ta create koresilam sekhane ekta ekta kore value input korbo.prottekbar input change er sathe eta handle korte hobe jate latest value ta form datar moddhe thake. 
        formData.set(e.target.name, value);//formDatar duita option.1st option hosse datar name ta,2nd option ta hosse datar value ta
        setValues({
            ...values,
            [e.target.name]: value,
            error: false,
            success: false,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,//mane values ja ase sob spread operator diye thakbe
            error: false,
            loading: true,
            disabled: true,
            success: false
        })
        const { token } = userInfo();
        createProduct(token, formData)
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    quantity: '',
                    loading: false,
                    disabled: false,
                    success: true,
                    error: false
                })
            })
            .catch(error => {
                let errMsg = "Something went wrong!";
                if (error.response) errMsg = error.response.data;
                setValues({
                    ...values,
                    error: errMsg,
                    loading: false,
                    success: false,
                    disabled: false
                })
            })

    }

    const productForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Photo:</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    value={name}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description:</label>
                <textarea
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    value={description}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price:</label>
                <input
                    name="price"
                    onChange={handleChange}
                    className="form-control"
                    type="number"
                    value={price}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity:</label>
                <input
                    name="quantity"
                    onChange={handleChange}
                    className="form-control"
                    type="number"
                    value={quantity}
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category:</label>
                <select name="category" value={category} onChange={handleChange} className="form-control" required>
                    <option value="">----Select Category----</option>
                    {categories && categories.map(item => (
                        <option value={item._id} key={item._id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-outline-primary" type="submit" disabled={disabled}>Create Product</button>
        </form>
    );

    const goBack = () => (<div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">Go to Dashboard</Link>
    </div>)


    return (
        <Layout title="Add a new product">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(error, error)}
                    {showLoading(loading)}
                    {showSuccess(success, 'Product Added Successfully!')}
                    {productForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );

}

export default CreateProduct;