import { Meta, StoryObj } from "@storybook/nextjs"
import AppBar from "."

const meta = {
  component: AppBar,
  tags: ["autodocs"],
} satisfies Meta<typeof AppBar>

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "AppBar",
  }
}