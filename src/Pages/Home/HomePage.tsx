import TopBar from './TopBar';
import MapWithFilterUI from '../map/MapWithFilterUI';
import BottomSheetModal from './BottomSheetModal';
import BottomNavBar from '../../components/common/BottomNavBar';
import { useState } from 'react';

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col h-full relative bg-theme-primary">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI isExpanded={isExpanded} />
        <BottomSheetModal isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>
      <BottomNavBar active="home" />
    </div>
  );
}
