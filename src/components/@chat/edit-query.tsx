import Button from "../reusable/button";
import Input from "../reusable/input";

const EditQuery = () => {
  return (
    <form>
      <Input type="text" />
      <div className="flex items-center gap-2 mt-1">
        <Button type={"default"} size="default" classname="text-primary-900">
          Cancel
        </Button>
        <Button type={"primary"} size={"small"} classname="text-sm" rounded="small">
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditQuery;
