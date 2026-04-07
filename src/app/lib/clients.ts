import { faker } from "@faker-js/faker";
import { Client } from "@/app/types/client";

export function getClient(id: string): Client {
  faker.seed(Number(id));
  return {
    id,
    name: faker.person.fullName(),
  };
}
