import { createBrowserRouter} from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import CreateEmployee from './pages/CreateEmployee'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CreateEmployee />,
    },
    {
        path: '/EmployeeList',
        element: <EmployeeList />
    },
],)

