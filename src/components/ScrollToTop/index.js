import React, { useState } from 'react';
import { ScrollTo } from 'react-scroll-to';
import { FaArrowUp } from 'react-icons/fa';
// import ScrollToTop from 'react-scroll-up';

import './style.css';

function FAB() {
  const [showFab, setShowFab] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled === 0) {
      setShowFab(false);
    } else if (scrolled > 0) {
      setShowFab(true);
    }
  };

  window.addEventListener('scroll', toggleVisible);

  return showFab && (
    <ScrollTo>
      {({ scroll }) => (
        <button
          onClick={() => scroll({ y: 600, smooth: true })}
          type="button"
          className="
            flex
            flex-col
            items-center
            justify-center
            fixed
            left-fab-left
            bottom-fab-bottom-scroll"
        >
          <div className="float-fab w-16 h-16">
            <FaArrowUp size={35} />
          </div>
        </button>
      )}
    </ScrollTo>
  // <ScrollToTop showUnder={160}>
  // </ScrollToTop>
  );
}

export default FAB;
