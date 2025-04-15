import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaBars, FaHome, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaBarsProgress, FaBarsStaggered } from 'react-icons/fa6';



const linkVariants = {
  initial: { opacity: 0, x: -100 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
      type: 'spring', stiffness: 80,
    },
  }),
};

function AnimatedWord({ iconsize, fsize }) {
  const letterVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  };

  const letterChildVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: [0, 20, 0],
      transition: {
        duration: 1,
        ease: 'easeOut',
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.h1 variants={letterVariants} initial="initial" animate="animate">
      {Array.from('Wonge').map((letter, index) => (
        <motion.span
          key={index}
          variants={letterChildVariants}
          style={{
            color: 'rgba(60, 60, 60, 1)',
            display: 'inline-block',
            cursor: "auto",
            textShadow: '0 -3px 2px rgba(0,0,0,0.3)',
            fontFamily:"monospace",
            fontSize: "20px",
          }}
          whileHover={{ scale: 1.2, color: 'coral' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [headerAnimationKey, setHeaderAnimationKey] = useState(0); 
  const [sidebarAnimationKey, setSidebarAnimationKey] = useState(0); 


  const [isSearching,setIsSearching]=useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setSidebarAnimationKey((prevKey) => prevKey + 1);
      return !prev;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    setHeaderAnimationKey((prevKey) => prevKey + 1); 
  }, []);

  const checkScreenSize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);

    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menuButton');
      if (sidebar && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [checkScreenSize, closeSidebar]);

  return (
    <div style={navbarStyles}>
      {/* Menu button on the left */}
      <button id="menuButton" onClick={toggleSidebar} style={buttonStyles} aria-label="Toggle menu">
        <FaBarsStaggered style={menuIconStyles} />
      </button>

      <div style={headingContainerStyles}>
      </div>

      <div style={iconContainerStyles}>

        {/* Sidebar */}
        <nav
          id="sidebar"
          style={{ ...sidebarStyles, display: isOpen ? 'block' : 'none' }}
          role="navigation"
        >
          <motion.div initial="initial" animate={isOpen ? 'animate' : 'initial'}>
            <span
              style={{
                position: 'relative',
                top: '-10px',
                width: '100%',
                height: '120px',
                border: '1px solid white',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <AnimatedWord iconsize={`30px`} fsize={`20px`} key={sidebarAnimationKey} />
            </span>

            {/* Sidebar Links */}
            <motion.div variants={linkVariants} custom={0} style={{ marginTop: '20px' }}>
              <Link
                href="/home/HomePage"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={() => {
                  handleHomeClick();
                  closeSidebar();
                }}
              >
                Home
                <FaHome style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>


            
            <motion.div variants={linkVariants} custom={2}>
              <Link
                href="/Jewelry"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Jewelry
              </Link>
            </motion.div>


            <motion.div variants={linkVariants} custom={3}>
              <Link
                href="/Avon"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Lotion
              </Link>
            </motion.div>

            
            <motion.div variants={linkVariants} custom={4}>
              <Link
                href="/Policy"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Policies
              </Link>
            </motion.div>


            <motion.div variants={linkVariants} custom={5}>
              <Link
                href="/manageInventory/ManageInventory"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Settings
              </Link>
            </motion.div>

          </motion.div>
        </nav>
      </div>
    </div>
  );
}

const navbarStyles = {
  position: 'fixed',
  top:'0',left:'0',right:'0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 30px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  backgroundColor: 'rgba(255,255,255,9)',
  zIndex: 1000,
  boxShadow: '10px 2px 10px rgba(0, 0, 0, 0.01)',
};

const headingContainerStyles = {
  position: 'relative',
  textAlign: 'center',
};

const iconContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const userNavStyles = {
  position: 'fixed',
  right: '15px',
  padding: '4px',
  border: '1px solid rgba(225, 228, 231, 0.5)',
  borderRadius: '50%',
  backgroundColor: 'rgba(225, 228, 231, 0.8)',
};

const iconStyles = {
  color: 'rgba(60, 60, 60, 1)',
  fontSize: '18px',
};

const buttonStyles = {
  display: 'block',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
  left: '-15px',
};

const menuIconStyles = {
  fontSize: '25px',
  color: '#333',
};

const sidebarStyles = {
  position: 'fixed',
  top: 0,
  left: 0, // Sidebar now on the left
  height: '100%',
  width: '250px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.8)', 
  padding: '20px',
  zIndex: 1000,
  backdropFilter: 'blur(10px)', 
  borderRadius: '2px',
};

const sidebarLinkStyles = {
  position: 'relative',
  top: '-20px',
  display: 'block',
  margin: '4px 0',
  fontSize: '1.8rem',
  color: 'rgba(60, 60, 60, 1)',
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255)',
  boxShadow: '-2px -7px 5px rgba(0,0,0,0.3)',
  transition: 'background-color 0.3s',
  textShadow: '-1px -1px 1px rgba(0,0,0,0.5)',
};

export default Navbar;
