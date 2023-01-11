import { Image } from "antd";
import EmptyImage from "@assets/empty.png";

function EmptyComponent(props: { title: string }) {
  return (
    <section className="empty p-4 grid place-items-center h-full">
      <div className="empty-text font-bold text-xl mb-5">{props.title}</div>
      <Image src={EmptyImage} />
    </section>
  );
}

export default EmptyComponent;
