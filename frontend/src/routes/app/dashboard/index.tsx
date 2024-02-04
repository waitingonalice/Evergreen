import { Main } from "~/components";

const Dashboard = () => {
  console.log(window.location);
  return (
    <Main>
      <Main.Header />
      <Main.Content>
        <h1>Dashboard</h1>
      </Main.Content>
    </Main>
  );
};

export default Dashboard;
