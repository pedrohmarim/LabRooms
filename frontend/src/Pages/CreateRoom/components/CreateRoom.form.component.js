import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TIPO_CATEGORIA } from "../../../Helpers/TipoCategoria";
import {
  Form,
  FeatherIcons,
  Row,
  Input,
  Button,
  Upload,
  Select,
  Tooltip,
  Notification,
} from "../../../antd_components";
import { FormItem } from "../../Signup/components/SignupForm/Signup.form.styled";
import {
  acceptedFileTypes,
  isValidExtension,
  isValidFileSize,
} from "../Helper/UploadImage.helper";
import Cookie from "js-cookie";
import * as CreateRoomService from "../services/createroom.service";
import Swal from "sweetalert2";

const SigninForm = ({ darkPallete }) => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [newCategory, setNewCategory] = useState(false);

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function beforeUpload(file) {
    const nameSplit = file.name.trim().split(".");
    const extension = nameSplit[nameSplit.length - 1];

    if (!isValidExtension(extension)) {
      Notification.open({
        type: "error",
        message: "Formato de Arquivo Inválido",
      });
      return Upload.LIST_IGNORE;
    }

    if (!isValidFileSize(file.size, 3)) {
      Notification.open({
        type: "error",
        message: "Arquivos de imagem devem ser menores que 3MB!",
      });
      return Upload.LIST_IGNORE;
    }

    return false;
  }

  function onSubmit(values) {
    let { logo, title, description, category, newCategory } = values;

    const token = Cookie.get("token");

    const { file } = logo;

    const { uid, name, size, type, lastModified } = file;

    const dto = {
      uid,
      name,
      size,
      type,
      lastModified,
      title,
      description,
      categoryId: newCategory ? null : category,
      newCategory: newCategory || null,
    };

    CreateRoomService.createRoom(dto, token).then((res) => {
      const { message, success } = res.data;

      if (success) {
        navigate("/");

        Notification.open({
          type: "success",
          message,
          style: {
            zIndex: 999,
          },
          duration: 2,
        });
      } else {
        Notification.open({
          type: "error",
          message: "Erro",
          description: message,
        });
      }
    });
  }

  useEffect(() => {
    CreateRoomService.getCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function handleOtherCategories(value) {
    setNewCategory(value === TIPO_CATEGORIA.CATEGORIA_OUTRAS);
  }

  return (
    <Form layout='vertical' onFinish={onSubmit} form={form}>
      <FormItem
        label='Título'
        name='title'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='type' size={15} />}
          placeholder='Título'
        />
      </FormItem>

      <FormItem
        label='Descrição'
        name='description'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='edit' size={15} />}
          placeholder='Ex.: Sala destinada à assuntos sobre saúde'
        />
      </FormItem>

      <FormItem
        label='Categoria'
        name='category'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Select
          allowClear
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder='Ex.: Alimentos'
          onChange={handleOtherCategories}
        >
          {categories &&
            categories
              .sort((a, b) =>
                a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
              )
              .map(({ Title, _id, Icon }) => (
                <Select.Option key={_id} value={_id}>
                  <Row align='middle' justify='start'>
                    <FeatherIcons icon={Icon} size={15} />
                    <span style={{ margin: "2px 0 0 5px" }}>{Title}</span>
                  </Row>
                </Select.Option>
              ))}
          <Select.Option key={11} value={11}>
            <Row align='middle' justify='start'>
              <FeatherIcons icon='repeat' size={15} />
              <span style={{ margin: "2px 0 0 5px" }}>
                Outras
                <i style={{ color: "gray" }}>
                  - Ao selecionar, poderá criar uma nova categoria
                </i>
              </span>
            </Row>
          </Select.Option>
        </Select>
      </FormItem>

      {newCategory && (
        <FormItem
          label='Nova Categoria'
          name='newCategory'
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Input
            style={styleInput}
            allowClear
            prefix={<FeatherIcons icon='tag' size={15} />}
            placeholder='Ex.: Construções'
          />
        </FormItem>
      )}

      <FormItem
        label='Logo'
        name='logo'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Upload
          accept={acceptedFileTypes}
          beforeUpload={beforeUpload}
          multiple={false}
          maxCount={1}
        >
          <Tooltip title='Enviar logo da sala' color={darkPallete.lightblue}>
            <Button icon={<FeatherIcons icon='upload' size={15} />}>
              <span style={{ marginLeft: "5px" }}>Enviar imagem</span>
            </Button>
          </Tooltip>
        </Upload>
      </FormItem>

      <Button
        style={{
          width: "100%",
          height: "45px",
          borderRadius: "8px",
          marginTop: "20px",
          background: darkPallete.lightblue,
        }}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </Button>
    </Form>
  );
};

export default SigninForm;
