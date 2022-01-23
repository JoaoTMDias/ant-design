import * as React from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';

import DropDown, { DropDownProps } from '../dropdown/dropdown';
import { ConfigContext } from '../config-provider';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  overlay?: DropDownProps['overlay'];
  dropdownProps?: DropDownProps;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  className?: string;
  current?: boolean;
}
interface BreadcrumbItemInterface extends React.FC<BreadcrumbItemProps> {
  __ANT_BREADCRUMB_ITEM: boolean;
}
const BreadcrumbItem: BreadcrumbItemInterface = ({
  prefixCls: customizePrefixCls,
  separator = '/',
  children,
  overlay,
  dropdownProps,
  current,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  const ariaCurrent = current ? 'page' : undefined;
  /** If overlay is have Wrap a DropDown */
  const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
    if (overlay) {
      return (
        <DropDown overlay={overlay} placement="bottomCenter" {...dropdownProps}>
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            <DownOutlined />
          </span>
        </DropDown>
      );
    }
    return breadcrumbItem;
  };

  let link;
  if ('href' in restProps) {
    link = (
      <a className={`${prefixCls}-link`} aria-current={ariaCurrent} {...restProps}>
        {children}
      </a>
    );
  } else {
    link = (
      <span className={`${prefixCls}-link`} aria-current={ariaCurrent} {...restProps}>
        {children}
      </span>
    );
  }

  // wrap to dropDown
  link = renderBreadcrumbNode(link);
  if (children) {
    return (
      <li className="ant-breadcrumb-list-item">
        {link}
        {separator && (
          <span className={`${prefixCls}-separator`} aria-hidden>
            {separator}
          </span>
        )}
      </li>
    );
  }
  return null;
};

BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;

export default BreadcrumbItem;
