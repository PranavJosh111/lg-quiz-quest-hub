import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Shirt, User, Eye } from "lucide-react";

interface AvatarCustomizerProps {
  selectedAvatar: number;
  onAvatarChange: (avatarIndex: number) => void;
  userName: string;
}

const AvatarCustomizer = ({ selectedAvatar, onAvatarChange, userName }: AvatarCustomizerProps) => {
  const [customization, setCustomization] = useState({
    style: 'avataaars',
    backgroundColor: 'transparent',
    hairColor: 'brown',
    skinColor: 'light',
    clothingColor: 'blue'
  });

  // 20+ avatar styles with different seeds and styles
  const avatarStyles = [
    { name: 'Professional 1', seed: 'john', style: 'avataaars' },
    { name: 'Professional 2', seed: 'jane', style: 'avataaars' },
    { name: 'Casual 1', seed: 'alex', style: 'avataaars' },
    { name: 'Casual 2', seed: 'sarah', style: 'avataaars' },
    { name: 'Corporate 1', seed: 'michael', style: 'avataaars' },
    { name: 'Corporate 2', seed: 'lisa', style: 'avataaars' },
    { name: 'Creative 1', seed: 'david', style: 'avataaars' },
    { name: 'Creative 2', seed: 'emma', style: 'avataaars' },
    { name: 'Tech 1', seed: 'ryan', style: 'avataaars' },
    { name: 'Tech 2', seed: 'sophia', style: 'avataaars' },
    { name: 'Minimalist 1', seed: 'chris', style: 'initials' },
    { name: 'Minimalist 2', seed: 'anna', style: 'initials' },
    { name: 'Modern 1', seed: 'kevin', style: 'personas' },
    { name: 'Modern 2', seed: 'maya', style: 'personas' },
    { name: 'Geometric 1', seed: 'tom', style: 'identicon' },
    { name: 'Geometric 2', seed: 'zoe', style: 'identicon' },
    { name: 'Playful 1', seed: 'ben', style: 'bottts' },
    { name: 'Playful 2', seed: 'chloe', style: 'bottts' },
    { name: 'Abstract 1', seed: 'jake', style: 'shapes' },
    { name: 'Abstract 2', seed: 'ruby', style: 'shapes' }
  ];

  const backgroundColors = [
    { name: 'Transparent', value: 'transparent' },
    { name: 'Blue', value: '3b82f6' },
    { name: 'Purple', value: '8b5cf6' },
    { name: 'Green', value: '10b981' },
    { name: 'Pink', value: 'ec4899' },
    { name: 'Red', value: 'dc2626' }
  ];

  const generateAvatarUrl = (index: number, customBg?: string) => {
    const avatar = avatarStyles[index];
    const bgColor = customBg || customization.backgroundColor;
    const baseUrl = `https://api.dicebear.com/7.x/${avatar.style}/svg?seed=${avatar.seed}`;
    
    if (bgColor !== 'transparent') {
      return `${baseUrl}&backgroundColor=${bgColor}`;
    }
    return baseUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Customize Your Avatar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="avatars" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="avatars">Avatars</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="avatars" className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src={generateAvatarUrl(selectedAvatar)} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {avatarStyles.map((avatar, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => onAvatarChange(index)}
                    className={`w-full p-1 rounded-lg border-2 transition-all ${
                      selectedAvatar === index
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-border'
                    }`}
                  >
                    <Avatar className="w-full h-12">
                      <AvatarImage src={generateAvatarUrl(index)} />
                      <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </button>
                  <Badge 
                    variant="secondary" 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs px-1 py-0"
                  >
                    {avatar.name.split(' ')[1]}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Background Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {backgroundColors.map((color) => (
                    <Button
                      key={color.value}
                      variant={customization.backgroundColor === color.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCustomization(prev => ({ ...prev, backgroundColor: color.value }))}
                      className="flex items-center gap-1"
                    >
                      <div 
                        className="w-3 h-3 rounded-full border" 
                        style={{ backgroundColor: color.value === 'transparent' ? '#f3f4f6' : `#${color.value}` }}
                      />
                      {color.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Avatar className="w-20 h-20 border-2 border-primary">
                  <AvatarImage src={generateAvatarUrl(selectedAvatar, customization.backgroundColor)} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AvatarCustomizer;