import TopBar from './TopBar';
import MapWithFilterUI from '../map/MapWithFilterUI';
import BottomSheetModal from './BottomSheetModal';
import BottomNavBar from '../../components/common/BottomNavBar';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full relative bg-theme-primary">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI />
        <BottomSheetModal />
      </div>
      <BottomNavBar active="home" />
    </div>
  );
}
