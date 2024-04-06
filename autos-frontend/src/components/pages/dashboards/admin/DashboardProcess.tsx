import InsertBrand from './components/InsertBrand';
import InsertModel from './components/InsertModel';
import PublishInserate from './components/PublishInserate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const enum ButtonNames {
  VIEW_CARS = "viewCars",
  ADD_CAR = "addCar",
  ADD_BRAND = "addBrand",
  ADD_MODEL = 'addModel',
  PUBLISH = 'publish'
}

export default function DashboardProcess() {

  // Redux
  const whichButtonClicked = useSelector((state: RootState) => state.userLoggedIn.whichButtonClicked)

  const ShowUI = () => {
    switch (whichButtonClicked) {
      case ButtonNames.ADD_BRAND: {
        return <InsertBrand /> 
      }
      case ButtonNames.ADD_MODEL: { 
        return <InsertModel />
          }
      case ButtonNames.PUBLISH: {
        return <PublishInserate />
      }
    }
  }

  return (
    <>          <ShowUI />
        
    </>
  );
}
