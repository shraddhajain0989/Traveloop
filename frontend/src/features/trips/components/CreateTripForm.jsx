import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useToast } from "@/shared/hooks/useToast";
import { createTripSchema } from "../schemas/createTripSchema";

export function CreateTripForm() {
  const { showToast } = useToast();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: "onChange", resolver: zodResolver(createTripSchema) });

  const onSubmit = async () => {
    showToast({
      type: "success",
      title: "Trip draft saved",
      description: "This form is ready to connect to Flask and MongoDB Atlas.",
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.title?.message} id="title" label="Trip name" placeholder="Nordic summer loop" {...register("title")} />
      <Input error={errors.cities?.message} id="cities" label="Destinations" placeholder="Copenhagen, Oslo, Stockholm" {...register("cities")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input error={errors.startDate?.message} id="startDate" label="Start date" type="date" {...register("startDate")} />
        <Input error={errors.endDate?.message} id="endDate" label="End date" type="date" {...register("endDate")} />
      </div>
      <Input error={errors.budget?.message} id="budget" label="Estimated budget" min="0" type="number" {...register("budget")} />
      <Button disabled={!isValid} isLoading={isSubmitting} type="submit">
        Save trip draft
      </Button>
    </form>
  );
}

