
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { useMemo, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch } from 'react-redux';
import { updateInventory, deleteProduct } from '../slices/inventorySlice';
import { Product } from '../types/types';


type ProductsProps = {
    products: Array<Product>;
    isAdmin: boolean;
}
        

function Products({products, isAdmin}: ProductsProps) {

    const [editProductDialog, setEditProductDialog] = useState(false);
    const [product, setSelectedProduct] = useState<Partial<Product>>({});
    const [disabledProducts, setDisabledProducts] = useState<Array<string>>([]);
    const dispatch = useDispatch();

    const columns = useMemo(() => {
        return [
            {field: 'name', header: 'Name'},
            {field: 'category', header: 'Category'},
            {field: 'price', header: 'Price'},
            {field: 'quantity', header: 'Quantity'},
            {field: 'value', header: 'Value'}
        ]
    }, [])

    const updateProduct = (key: string, value: any) => {
        setSelectedProduct(prev => {
            return {
                ...prev,
                [key] : value
            }
        })
    }

    const handleSubmit = () => {
        dispatch(updateInventory(product));
        setSelectedProduct({});
        setEditProductDialog(false);
    }

    const handleEdit = (product: Product) => {
        setEditProductDialog(true);
        setSelectedProduct(product);
    }

    const handleDeleteProduct = (product: Product) => {
        dispatch(deleteProduct(product));
    }

    const handleDisableProduct = (id: string) => {
        setDisabledProducts(prev => {
            let disabled = [...prev];
            if(disabled.includes(id)) {
                disabled = disabled.filter(val => val !== id);
            } else disabled.push(id);
            return disabled;
        })
    }

    const isDisabled = (productId: string) => disabledProducts.includes(productId)

    const editProductTemplate = (product: Product) =>  {
        const disabled = isDisabled(product.id)  

        return <div className="flex flex-wrap align-items-center gap-3">
            <div className={`${disabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'}`} onClick={() => {!disabled && handleEdit(product)}}><i className='pi pi-pencil '></i></div>
            <div onClick={() => handleDisableProduct(product.id)}>
                {disabled ?  <i className="pi pi-eye-slash cursor-pointer" ></i> : <i className="pi pi-eye cursor-pointer" ></i>}
            </div>
            <i className={`pi pi-trash cursor-pointer hover:text-red-300`} onClick={() => handleDeleteProduct(product)}></i>
        </div>
    }

    const hideDialog = () => {
        setSelectedProduct({});
        setEditProductDialog(prev => !prev);
    }

    const isRowSelectable = (event: any) => {
        return !isDisabled(event.data.id);
    }

    return (
        <div className="card">
            <DataTable selectionMode={'single'} isDataSelectable={isRowSelectable} showGridlines value={products} tableStyle={{ minWidth: '70vw' }}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                {isAdmin && <Column key={'actions'} header={'Actions'} body={editProductTemplate}/>}
            </DataTable>
            {editProductDialog && <Dialog header={`Edit ${product.name}`} visible={editProductDialog} style={{ width: '600px' }} onHide={hideDialog}>
                <div className='flex flex-column gap-5'>
                    <div className="flex gap-2">
                        <div className='flex flex-1 flex-column gap-2'>
                            <label htmlFor="category">Category</label>
                            <InputText id='category'  value={product.category} onChange={(e) => {
                                updateProduct('category', e.target.value)
                            }} />
                        </div>
                        <div className='flex flex-1 flex-column gap-2'>
                            <label htmlFor="price">Price</label>
                            <InputNumber inputId="currency-us"  value={product.price} onValueChange={(e) =>  updateProduct('price', e.target.value)} mode="currency" currency="USD" locale="en-US" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className='flex flex-1 flex-column gap-2'>
                            <label htmlFor="quantity">Quantity</label>
                            <InputText id='quantity'  value={product.quantity+""} onChange={(e) =>  updateProduct('quantity', +e.target.value)} />
                        </div>
                        <div className='flex flex-1 flex-column gap-2'>
                            <label htmlFor="value">Value</label>
                            <InputNumber inputId="currency-us"  value={product.value} onValueChange={(e) =>  updateProduct('value', e.target.value)} mode="currency" currency="USD" locale="en-US" />
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-row-reverse mt-5 gap-3'>
                    <div><Button label='Save' onClick={handleSubmit} text/></div>
                    <div><Button label='Cancel' severity='danger' text onClick={hideDialog}/></div>
                </div>
            </Dialog>}
        </div>
    );
}

export default Products;