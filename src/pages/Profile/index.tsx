import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { useAuth } from "../../hooks/auth";

import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { Button } from "../../components/Button";

import Feather from "@expo/vector-icons/Feather";

import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

import * as Yup from "yup";

import { useTheme } from "styled-components";
import * as S from "./styles";

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driveLicense, setDriveLicense] = useState(user.driver_license);

  const { goBack } = useNavigation();
  const theme = useTheme();

  function handleChangeOption(selectedOption: "dataEdit" | "passwordEdit") {
    setOption(selectedOption);
  }

  async function handleAvatarSelect() {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (response.cancelled) {
      return;
    }

    const { uri } = response as ImageInfo;
    setAvatar(uri);
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driveLicense: Yup.string().required("CHN Obrigatória"),
        name: Yup.string().required("Nome Obrigatório"),
      });

      const data = { driveLicense, name };
      schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        name,
        email: user.email,
        driver_license: driveLicense,
        avatar,
        token: user.token,
      });

      Alert.alert("Perfil atualizado!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa!", error.message);
      }

      Alert.alert("Ocorreu um erro ao atualizar o perfil.");
    }
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Ao deslogar, você irá precisar de internet para entrar no app novamente.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton
                color={theme.colors.background_secondary}
                onPress={() => goBack()}
              />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.SignOutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.SignOutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              {!!avatar && <S.Photo source={{ uri: avatar }} />}
              <S.PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.background_secondary}
                />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ paddingBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option
                active={option === "dataEdit"}
                onPress={() => handleChangeOption("dataEdit")}
              >
                <S.OptionTitle active={option === "dataEdit"}>
                  Dados
                </S.OptionTitle>
              </S.Option>

              <S.Option
                active={option === "passwordEdit"}
                onPress={() => handleChangeOption("passwordEdit")}
              >
                <S.OptionTitle active={option === "passwordEdit"}>
                  Trocar Senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            {option === "dataEdit" ? (
              <S.Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCorrect={false}
                  defaultValue={user.driver_license}
                  onChangeText={setDriveLicense}
                />
              </S.Section>
            ) : (
              <S.Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />

                <PasswordInput iconName="lock" placeholder="Nova senha" />

                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </S.Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
