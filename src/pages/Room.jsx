import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Music, Users, MessageCircle, Gamepad2, Mic, Play, Pause, SkipForward, SkipBack, Volume2, Heart, Share2, Settings, LogOut } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import ChatPanel from "@/components/ChatPanel";
import ParticipantsList from "@/components/ParticipantsList";
import GamePanel from "@/components/GamePanel";
import KaraokePanel from "@/components/KaraokePanel";

const Room = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("music");
  const [audioSettings, setAudioSettings] = useState({
    volume: [75],
    audioDevice: "default",
    quality: "high"
  });
  
  // Mock room data
  const roomData = {
    name: "Chill Vibes Room",
    code: roomCode || "ABC123",
    participants: [
      { id: 1, name: "You", avatar: "🎵", isHost: true, isActive: true },
      { id: 2, name: "Alex", avatar: "🎧", isHost: false, isActive: true },
      { id: 3, name: "Sam", avatar: "🎤", isHost: false, isActive: false },
      { id: 4, name: "Jordan", avatar: "🎸", isHost: false, isActive: true },
    ]
  };

  const currentSong = {
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    currentTime: "1:32"
  };

  const handleShareRoom = () => {
    const roomLink = `${window.location.origin}/room/${roomData.code}`;
    navigator.clipboard.writeText(roomLink).then(() => {
      toast({
        title: "Room link copied!",
        description: `Share code ${roomData.code} with your friends`,
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: `Room code: ${roomData.code}`,
        variant: "destructive",
      });
    });
  };

  const handleLeaveRoom = () => {
    navigate("/");
    toast({
      title: "Left room",
      description: "You've successfully left the room",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Room Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{roomData.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  {roomData.code}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {roomData.participants.length}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="hero" size="sm">
              Invite Friends
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Music Player */}
          <MusicPlayer currentSong={currentSong} />
          
          {/* Tabs for Features */}
          <Card className="bg-card/80 backdrop-blur-md border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground">Room Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                  <TabsTrigger value="music" className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    Queue
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="games" className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    Games
                  </TabsTrigger>
                  <TabsTrigger value="karaoke" className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Karaoke
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-6">
                  <TabsContent value="music" className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Up Next</h3>
                      {[
                        { title: "Bohemian Rhapsody", artist: "Queen", addedBy: "Alex" },
                        { title: "Hotel California", artist: "Eagles", addedBy: "Sam" },
                        { title: "Stairway to Heaven", artist: "Led Zeppelin", addedBy: "Jordan" },
                      ].map((song, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{song.title}</p>
                            <p className="text-sm text-muted-foreground">{song.artist}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Added by {song.addedBy}
                          </Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Music className="w-4 h-4" />
                        Add Song to Queue
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="chat">
                    <ChatPanel />
                  </TabsContent>
                  
                  <TabsContent value="games">
                    <GamePanel />
                  </TabsContent>
                  
                  <TabsContent value="karaoke">
                    <KaraokePanel />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ParticipantsList participants={roomData.participants} />
          
          {/* Quick Actions */}
          <Card className="bg-card/80 backdrop-blur-md border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Audio Settings Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Volume2 className="w-4 h-4" />
                    Audio Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card/95 backdrop-blur-md border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Audio Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Master Volume</label>
                      <Slider
                        value={audioSettings.volume}
                        onValueChange={(value) => setAudioSettings(prev => ({ ...prev, volume: value }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-sm text-muted-foreground">{audioSettings.volume[0]}%</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Audio Device</label>
                      <Select value={audioSettings.audioDevice} onValueChange={(value) => setAudioSettings(prev => ({ ...prev, audioDevice: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="speakers">Speakers</SelectItem>
                          <SelectItem value="headphones">Headphones</SelectItem>
                          <SelectItem value="bluetooth">Bluetooth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Audio Quality</label>
                      <Select value={audioSettings.quality} onValueChange={(value) => setAudioSettings(prev => ({ ...prev, quality: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (128 kbps)</SelectItem>
                          <SelectItem value="medium">Medium (256 kbps)</SelectItem>
                          <SelectItem value="high">High (320 kbps)</SelectItem>
                          <SelectItem value="lossless">Lossless</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Share Room Button */}
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleShareRoom}>
                <Share2 className="w-4 h-4" />
                Share Room
              </Button>

              {/* Leave Room Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="w-full justify-start">
                    <LogOut className="w-4 h-4" />
                    Leave Room
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card/95 backdrop-blur-md border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">Leave Room?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Are you sure you want to leave this room? You'll need the room code to rejoin.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLeaveRoom} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Leave Room
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Room;