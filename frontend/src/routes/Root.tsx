import { FormInput, FormButton } from "~/components";
const Root = () => {
  return (
    <div className="min-w-screen bg-layerOne min-h-screen">
      <FormButton id="test">Test button</FormButton>
      <FormButton id="test">Test button</FormButton>
      <FormButton id="test">Test button</FormButton>

      <FormInput
        id="email"
        label="Email"
        placeholder="test@yopmail.com"
        type={"email"}
        required
        error={"error"}
      />
      <FormInput
        id="password"
        label="Password"
        type={"password"}
        required
        // error={"error"}
      />
    </div>
  );
};
export default Root;
