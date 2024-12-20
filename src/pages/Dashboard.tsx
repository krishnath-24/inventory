import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../slices/inventorySlice';
import { useCallback, useEffect, useState } from 'react';
import Products from '../components/Products';
import InventoryMetrics from '../components/InventoryMetrics';
import { Product } from '../types/types';
import { Checkbox } from 'primereact/checkbox';

function Dashboard() {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const dispatch = useDispatch<any>();
    const {value : productsList, error} = useSelector((state: any) =>  state.inventory);

    const getMetrics = useCallback(() => {
        const totalProducts = productsList.length;
        const set = new Set();
        const totalStoreVal = productsList.reduce((acc: number, item: Product) => {
            set.add(item.category);
            return acc + item.value;
        }, 0);
        
        const outOfStock = productsList.reduce((acc: number, item: Product) => {
            
            return item.quantity === 0 ? acc + 1 : acc;
        }, 0);
        const numCategories = set.size;

        return [{
            key: 'Total Products',
            value: totalProducts,
            icon: 'pi-shopping-cart'
        }, {
            key: 'Total Store Value',
            value: totalStoreVal,
            icon: 'pi-dollar'
        }, {
            key: 'Out of Stock',
            value: outOfStock,
            icon: 'pi-spinner-dotted'
        }, {
            key: 'No. of Categories',
            value: numCategories,
            icon: 'pi-objects-column'
        }]
    }, [productsList])
    
    useEffect(() => {
        dispatch(fetchInventory());
    }, [])

    if(error) return <div>Something went wrong :(</div>

    return <div className='max-w-[70vw]'>
        <div className='flex justify-content-between justify-items-center items-center w-full'>
            <h2>Inventory Dashboard</h2>
            <div className='flex justify-center items-center h-full gap-2'>
                <label htmlFor='admin'>Admin</label>
                <Checkbox id='admin' checked={isAdmin} onChange={() => setIsAdmin(prev => !prev)} />
            </div>
        </div>
        <InventoryMetrics metrics={getMetrics()} />

        <Products products={productsList} isAdmin={isAdmin}/>
    </div>
}

export default Dashboard;