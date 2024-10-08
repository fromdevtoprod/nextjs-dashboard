'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const [name, setName] = useState('Dr. Jane Smith');
  const [email, setEmail] = useState('jane.smith@example.com');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  const t = useTranslations('SettingsPage');

  const handleSave = () => {
    // Handle saving settings
    console.log('Settings saved');
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
          Settings
        </h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList> */}

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t('accountTab.title')}</CardTitle>
              <CardDescription>{t('accountTab.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="language">
                  {t('accountTab.select.language.label')}
                </Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue
                      placeholder={t('accountTab.select.language.placeholder')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('english')}</SelectItem>
                    <SelectItem value="fr">{t('french')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select>
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select a font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button
          onClick={handleSave}
          className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
        >
          {t('saveButton')}
        </Button>
      </div>
    </main>
  );
}
