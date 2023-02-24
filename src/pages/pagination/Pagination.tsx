import React, { useState, useMemo } from "react";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useConfig } from "../_util/use-config";
import { StyledProps } from "../_type";
import { Button } from "../button";
import { Icon } from "../icon";
import { Dropdown } from "../dropdown";
import { ListView } from "../list-view";
import { List } from "../list";

interface PagingQuery {
  /**
   * 页码：从 1 开始索引
   */
  pageIndex?: number;
}

export interface PaginationProps extends StyledProps {
  /**
   * 数据总个数，用于计算页数
   */
  total: number;
  /**
   * 页长：表示每页展示记录数
   */
  pageSize: number;
  /**
   * 页码：从1开始索引
   */
  pageIndex: number;
  /**
   * 是否展示总数
   * @default true
   */
  showTotal?: boolean;
  /**
   * 切换分页回调函数
   */
  onPagingChange: (query: PagingQuery) => void;
}

interface PaginationDropdownProps extends StyledProps {
  pageNum: number;
  pageIndex: number;
  onPagingChange: (query: PagingQuery) => void;
}

function PaginationDropdow({
  pageNum,
  pageIndex,
  onPagingChange,
}: PaginationDropdownProps) {
  const [visible, setVisible] = useState(false);
  const { classPrefix } = useConfig();
  const itemData = useMemo(
    () =>
      Array(pageNum)
        .fill(null)
        .map((_, index) => ({ id: index, text: String(index + 1) })),
    [pageNum]
  );
  const itemSize = 48;
  const itemCount = pageNum < 5 ? pageNum : 5;
  return (
    <Dropdown
      className={classNames(`${classPrefix}-pagination__dropdown`)}
      overlay={
        <ListView
          className={classNames(`${classPrefix}-pagination__dropdownlist`)}
          height={itemSize * itemCount}
          scrollTop={itemSize * pageIndex}
          itemSize={itemSize}
          itemData={itemData}
          itemKey={data => data.id}
          itemRender={({ style, data }) => {
            const isSelected = pageIndex === data.id + 1;
            return (
              <List.Item
                style={{ ...style }}
                title={
                  <Text
                    className={classNames(
                      `${classPrefix}-pagination__dropdowntext`,
                      isSelected ? "selected" : ""
                    )}
                  >
                    {data.text}
                  </label>
                }
                onClick={() => {
                  setVisible(false);
                  if (onPagingChange) {
                    if (!isSelected) {
                      onPagingChange({ pageIndex: data.id + 1 });
                    }
                  }
                }}
              >
                {isSelected ? <Icon name="check" color="#006eff" /> : null}
              </List.Item>
            );
          }}
        />
      }
      visible={visible}
      onVisibleChange={visible => setVisible(visible)}
    >
      <div 
        className={classNames(`${classPrefix}-pagination__currentpage`)}
        onClick={() => setVisible(!visible)}
      >
        <Text
          className={classNames(`${classPrefix}-pagination__currentpage--text`)}
        >
          {pageIndex}
        </label>
        <Icon name="chevrondown" color="#000" />
      </div>
    </Dropdown>
  );
}

export function Pagination({
  total,
  pageSize,
  pageIndex,
  showTotal = true,
  onPagingChange,
}: PaginationProps) {
  const { classPrefix } = useConfig();
  const pageNum = Math.ceil(total / pageSize);
  const isFirstPage = pageIndex <= 1;
  const isLastPage = pageIndex >= pageNum;
  return (
    <div className={classNames(`${classPrefix}-pagination`)}>
      <div className={classNames(`${classPrefix}-pagination__content`)}>
        <Button
          className={classNames(
            `${classPrefix}-pagination__button_prev`,
            isFirstPage ? "disabled" : ""
          )}
          type={isFirstPage ? "default" : "primary"}
          disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onPagingChange({ pageIndex: pageIndex - 1 });
            }
          }}
        >
          <Icon
            className={classNames(`${classPrefix}-pagination__button_icon`)}
            name="chevronleft"
            color={isFirstPage ? "#000" : "#fff"}
          />
          上一页
        </Button>
        <div className={classNames(`${classPrefix}-pagination__selector`)}>
          <PaginationDropdow
            pageIndex={pageIndex}
            pageNum={pageNum}
            onPagingChange={onPagingChange}
          />
          <label className={classNames(`${classPrefix}-pagination__totalpage`)}>
            / {pageNum}页
          </label>
        </div>
        <Button
          type={isLastPage ? "default" : "primary"}
          className={classNames(
            `${classPrefix}-pagination__button_next`,
            isLastPage ? "disabled" : ""
          )}
          disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onPagingChange({ pageIndex: pageIndex + 1 });
            }
          }}
        >
          下一页
          <Icon
            className={classNames(`${classPrefix}-pagination__button_icon`)}
            name="chevronright"
            color={isLastPage ? "#000" : "#fff"}
          />
        </Button>
      </div>
      {showTotal && (
        <label className={classNames(`${classPrefix}-pagination__total`)}>
          共{total}条
        </label>
      )}
    </div>
  );
}
