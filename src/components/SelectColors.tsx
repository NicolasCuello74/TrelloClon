import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const SelectDemo = ({ onColorChange }: { onColorChange: (color: string) => void }) => {
  return (
    <Select onValueChange={onColorChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectLabel>Colores</SelectLabel>
            <SelectItem value="bg-linear-to-r/hsl from-blue-500 to-blue-300">Azul</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-orange-700 to-orange-300">Naranja</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-red-700 to-red-300">Rojo</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-green-600 to-green-300">Verde</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-violet-500 to-purple-500">Morado</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-pink-700 to-pink-300">Rosa</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-lime-600 to-lime-300">Lima</SelectItem>
            <SelectItem value="bg-linear-to-r/hsl from-sky-500 to-sky-200">Celeste</SelectItem>
            <SelectItem value="bg-gray-500">Gris</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectDemo;
