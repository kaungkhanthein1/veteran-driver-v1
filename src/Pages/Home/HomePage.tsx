import TopBar from './TopBar';
import MapWithFilterUI from '../map/MapWithFilterUI';
import BottomSheetModal from './BottomSheetModal';
import BottomNavBar from '../../components/common/BottomNavBar';
import { useState } from 'react';
import MainContent from './MainContent';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col h-full relative bg-theme-primary">
      <AnimatePresence>
        {!isExpanded && (
          <motion.div 
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TopBar />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI isExpanded={isExpanded} />
        <BottomSheetModal isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <MainContent />
        </BottomSheetModal>
      </div>
      <BottomNavBar active="home" />
    </div>
  );
}
