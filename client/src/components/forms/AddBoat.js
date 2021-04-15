import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid'
import { ADD_BOAT, GET_BOATS } from '../../queries';


const AddBoat = () => {
  const [id] = useState(uuidv4())
  const [addBoat] = useMutation(ADD_BOAT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
const { year, make, model, price, personId } = values
    addBoat ({
        variables: {
            id,
            year,
            make,
            model,
            price,
            personId
        },
        optimisticResponse: {
            __typename: 'Mutation',
            addBoat: {
              __typename: 'Boat',
              id,
              year,
              make,
              model,
              price,
              personId,
            }
          },
          update: (proxy, { data: { addBoat } }) => {
            const data = proxy.readQuery({ query: GET_BOATS })
            proxy.writeQuery({
              query: GET_BOATS,
              data: {
                ...data,
                boats: [...data.boats, addBoat]
              }
            })
          }
    })

  }
  // get personId's to display in drop down menu
  const { loading, error, data } = useQuery(GET_BOATS)
  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`
  const menu = () => {

    return (
        <Menu>
          {data.boats.map(({id, personId}) => (
          <Menu.Item key={id}>
            {personId}
          </Menu.Item>
        ))}
    </Menu>
    )
  };

  return (
    <Form
      form={form}
      name='add-boat-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the boat year!' }]}
      >
        <Input placeholder='i.e. 2015' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input the boat make!' }]}
      >
        <Input placeholder='i.e. Sail Boat' />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input the boat model!' }]}
      >
        <Input placeholder='i.e. 3.5' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input the boat price!' }]}
      >
        <Input placeholder='i.e. $20,000' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input the personId!' }]}
      >
        <Input placeholder='i.e. Bill' />
      </Form.Item>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          personId <DownOutlined />
        </a>
      </Dropdown>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Boat
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddBoat
