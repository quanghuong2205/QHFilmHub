import { Children, createContext, useContext, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';

/* Context */
interface ITabContext {
  order: number;
  handleChangeOrder: (order: number) => () => void;
}
export const TabContext = createContext<ITabContext | null>(null);

/* Component and sub components */

function Tabs({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<number>(0);
  const handleChangeOrder = (order: number) => () => {
    setOrder(order);
  };

  return (
    <TabContext.Provider value={{ order, handleChangeOrder }}>
      <div className={styles['tabs']}>{children}</div>
    </TabContext.Provider>
  );
}

interface ITabTitlesProps {
  children?: React.ReactNode;
  titles?: {
    title: string;
    order: number;
  }[];
}
Tabs.TabTitles = function TabTitles({ children, titles }: ITabTitlesProps) {
  return (
    <div className={styles['tabs-title']}>
      {children}
      <>
        {titles?.length &&
          titles
            .sort((a, b) => a.order - b.order)
            .map((title, i) => (
              <Tabs.TabTitle
                {...title}
                key={`${title}/${i}`}
              />
            ))}
      </>
    </div>
  );
};

Tabs.TabTitle = function TabTitle({ title, order }: { title: string; order: number }) {
  const context = useContext(TabContext);
  if (!context) throw new Error('TabTitle must be inside tab context');
  const { handleChangeOrder, order: curOrder } = context;

  return (
    <button
      className={classNames(curOrder === order && styles['active'])}
      onClick={handleChangeOrder(order)}>
      {title}
    </button>
  );
};

Tabs.TabBody = function TabBody({ children }: { children: React.ReactNode }) {
  const context = useContext(TabContext);
  if (!context) throw new Error('TabBody must be inside tab context');
  const { handleChangeOrder, order } = context;
  return (
    <SwipeableViews
      index={order}
      containerStyle={{
        padding: '20px 0',
      }}>
      {children}
    </SwipeableViews>
  );
};

Tabs.Tab = function Tab({
  children,
  cls,
  style,
}: {
  children: React.ReactNode;
  cls?: string;
  style?: Record<string, string>;
}) {
  return (
    <div
      className={cls}
      style={style}>
      {children}
    </div>
  );
};

/* Export */
export default Tabs;
