import React from "react";
import { Button, Cell, Icon, Tag } from "@tencent/tea-component-mobile";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default function CellExample() {
  return (
    <div className="page">
      <label className="header">Cell 项</label>

      <label className="header">常用形态</label>
      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        footer={
          <Button.Group type="operational">
            <Button onClick={() => console.log(1)}>操作一</Button>
            <Button onClick={() => console.log(2)}>操作二</Button>
            <Button onClick={() => console.log("more")}>
              <Icon name="more" />
            </Button>
          </Button.Group>
        }
        onClick={() => console.log("Cell")}
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        extra={
          <Button onClick={() => console.log("more")}>
            <Icon name="more" />
          </Button>
        }
        onClick={() => console.log("Cell")}
      />

      <label className="header">基本用法</label>

      <Cell
        title="ins-computer-96ABA7"
        tag="正常态"
        description="IP: 10.66.232.243(公) 118.56.45.34(内)"
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag={
          <Tag round type="default">
            过程态
          </Tag>
        }
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        titleEllipsis={false}
        tag={
          <Tag round type="warning">
            警示态
          </Tag>
        }
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        icon="//imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/f494cee7-d4de-42c3-bab2-08a45edf8f5f.svg"
        tag={
          <Tag round type="danger">
            错误态
          </Tag>
        }
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        icon={{ name: "star-fill", color: "#FF9C19" }}
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
      />

      <label className="header">带右侧按钮</label>

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        extra={
          <Button onClick={() => console.log("more")}>
            <Icon name="more" />
          </Button>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        extra={
          <Button onClick={() => console.log("download")}>
            <Icon name="download" />
          </Button>
        }
      >
        <div>
          <div className="example__info">纸质合同已回寄</div>
          <div className="example__link">邮寄详情</div>
        </div>
      </Cell>

      <Cell
        title="用户名 18800000000"
        tag={<Tag round>默认</Tag>}
        description="广东省深圳市南山区深南大道 10000 号"
        extra={
          <Button onClick={() => console.log("edit")}>
            <Icon name="edit" />
          </Button>
        }
      />

      <label className="header">带底部操作按钮</label>

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        footer={
          <Button.Group type="operational">
            <Button onClick={() => console.log(1)}>操作一</Button>
            <Button onClick={() => console.log(2)}>操作二</Button>
          </Button.Group>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        footer={
          <Button.Group type="operational">
            <Button onClick={() => console.log(1)}>操作一</Button>
            <Button onClick={() => console.log(2)}>操作二</Button>
            <Button onClick={() => console.log(3)}>操作三</Button>
          </Button.Group>
        }
      />

      <Cell
        title="Centos-8GB-gz-79022(ins-computer-96ABA7)"
        tag="正常态"
        description={
          <div>
            <div>IP: 10.66.232.243(公) 118.56.45.34(内)</div>
            <div>创建时间: 2018-12-27 13:20:14</div>
          </div>
        }
        footer={
          <Button.Group type="operational">
            <Button onClick={() => console.log(1)}>操作一</Button>
            <Button onClick={() => console.log(2)}>操作二</Button>
            <Button onClick={() => console.log("more")}>
              <Icon name="more" />
            </Button>
          </Button.Group>
        }
      />
    </div>
  );
}
