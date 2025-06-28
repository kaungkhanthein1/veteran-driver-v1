import TopBar from './TopBar';
import MapWithFilterUI from '../map/MapWithFilterUI';
import BottomSheetModal from './BottomSheetModal';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full relative bg-theme-primary">
      <TopBar />
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI />
        <BottomSheetModal />
      </div>
    </div>
  );
}
