import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { getNavItems } from '../routes/config';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = getNavItems();

  const menuItems = navItems.map((item) => ({
    key: item.path,
    icon: item.icon ? <span style={{ marginRight: '5px' }}>{item.icon}</span> : null,
    label: item.title,
  }));

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <div style={{ 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ borderBottom: 'none' }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Navigation; 