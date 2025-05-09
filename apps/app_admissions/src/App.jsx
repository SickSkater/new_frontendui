import 'bootstrap/dist/css/bootstrap.min.css';

import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
import { AppRouter } from './AppRouter';
import BreadcrumbNavigation from './User/Components/BreadcrumbNavigation';

export const App = () => {
    return (
        <AppCanvas>
            <div className="App">
                <BreadcrumbNavigation maxHistory={5} />
                <AppRouter />
            </div>
        </AppCanvas>    
    )
}

