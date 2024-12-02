import { useFormContext } from "react-hook-form";

const Preview = () => {
  const form = useFormContext();

  const data = form.watch();

  return (
    <div>
      <p>{data.firstName}</p>
      <p>{data.LastName}</p>
      <p>{data.email}</p>
      {data.links.map((x) => {
        return (
          <div>
            <p>{x.platform}</p>
            <p>{x.link}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
